import { conectarDB, cerrarConexion } from './conexion.ts';

async function ejecutarCRUD() {
    try {
        // 1. Nos conectamos usando nuestro módulo centralizado de conexión
        const db = await conectarDB();

        const usersCollection = db.collection('users');
        const productsCollection = db.collection('products');
        const ordersCollection = db.collection('orders');

        // ==========================================
        // 1. CREATE (Inserción)
        // ==========================================
        const nuevoUsuario = await usersCollection.insertOne({
            nombre: "Rocío Laura",
            email: "rocio@mail.com",
            rol: "cliente",
            activo: true
        });
        console.log(' 1. CREATE: Usuario insertado con ID:', nuevoUsuario.insertedId);

        const nuevoProducto = await productsCollection.insertOne({
            nombre: "Hamburguesa Doble Cheddar",
            precio: 9500,
            categoria: "Comidas",
            stock: 20,
            activo: true
        });
        console.log(' 1. CREATE: Producto insertado con ID:', nuevoProducto.insertedId);

        // EXTRA TPI: Inserción de un pedido relacionando Usuario (Linking) y Producto (Embedding)
        const nuevoPedido = await ordersCollection.insertOne({
            usuarioId: nuevoUsuario.insertedId, // Linking con la colección users
            fecha: new Date(),
            estado: "pendiente",
            activo: true,
            productos: [ // Embedding del producto dentro del pedido
                {
                    productoId: nuevoProducto.insertedId,
                    nombre: "Hamburguesa Doble Cheddar",
                    cantidad: 2,
                    precioUnitario: 9500
                }
            ],
            total: 19000
        });
        console.log(' 1. CREATE (Pedido): Pedido insertado con ID:', nuevoPedido.insertedId);

        // ==========================================
        // 2. READ (Lectura respetando la baja lógica)
        // ==========================================
        // IMPORTANTE: Siempre filtramos { activo: true } para no traer datos borrados lógicamente.
        const productosActivos = await productsCollection.find({ activo: true }).toArray();
        console.log(' 2. READ: Listado de productos activos encontrados:', productosActivos.length);

        // ==========================================
        // 3. UPDATE (Modificación de un registro)
        // ==========================================
        const resultadoUpdate = await productsCollection.updateOne(
            { _id: nuevoProducto.insertedId },
            { $set: { precio: 10500 } } // Actualizamos el precio
        );
        console.log(' 3. UPDATE: Producto modificado. Documentos modificados:', resultadoUpdate.modifiedCount);

        // ==========================================
        // 4. DELETE (Baja Lógica / Soft Delete)
        // ==========================================
        // NO usamos deleteOne(). Cambiamos 'activo' a false para que persista en disco pero quede inhabilitado.
        const resultadoDeleteLogico = await usersCollection.updateOne(
            { _id: nuevoUsuario.insertedId },
            { $set: { activo: false } }
        );
        console.log(' 4. DELETE (Baja Lógica): Usuario desactivado correctamente:', resultadoDeleteLogico.modifiedCount);

    } catch (error) {
        console.error(' Error en las operaciones CRUD:', error);
    } finally {
        // Cerramos la conexión limpiamente al terminar
        await cerrarConexion();
    }
}

ejecutarCRUD();