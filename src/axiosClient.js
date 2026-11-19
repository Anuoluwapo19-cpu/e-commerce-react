import axios from "axios";

// const apiClient = await axios.get(
//     "http://localhost:4000/api/products/get"
// );

// console.log(apiClient.data);

const client = axios.create({
    baseURL: "http://localhost:4000/api/products",
    headers: {
        "Content-Type": "application/json",

    }
});

const apiClient = {
    getProducts: async () => {
        try {
            const response = await client.get("/get");
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }

        },
    getProductById: async (id) => {
        try {
            const response = await client.get(`/getProduct/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            throw error;
        }
    },
    createProduct: async (productData) => {
        try {
            const response = await client.post("/create", productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    },
    updateProduct: async (id, updatedData) => {
        try {
            const response = await client.patch(`/update/${id}`, updatedData);
            return response.data;
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error);
            throw error;
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await client.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error);
            throw error;
        }
    }
}


// console.log(await apiClient.createProduct({ name: "Test Product", "category": "men", price: "500", "image": "ttps://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600"}));
//console.log(await apiClient.getProducts());

export default apiClient;
