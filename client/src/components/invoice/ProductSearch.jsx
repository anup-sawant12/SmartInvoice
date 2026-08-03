import { useEffect, useState } from "react";
import Select from "react-select";

import { getProducts } from "../../services/productService";

const ProductSearch = ({ invoice, setInvoice }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      const options = res.data.map((product) => ({
        value: product.id,
        label: product.name,
        product,
      }));

      setProducts(options);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) return;

    const product = selectedProduct.product;

    const total = Number(product.price) * Number(quantity);

    const existingIndex = invoice.items.findIndex(
      (item) => item.productId === product.id
    );

    let updatedItems = [];

    if (existingIndex !== -1) {
      updatedItems = [...invoice.items];

      updatedItems[existingIndex].quantity += Number(quantity);

      updatedItems[existingIndex].total =
        updatedItems[existingIndex].price *
        updatedItems[existingIndex].quantity;
    } else {
      updatedItems = [
        ...invoice.items,
        {
          productId: product.id,
          productName: product.name,
          price: Number(product.price),
          quantity: Number(quantity),
          total,
        },
      ];
    }

    setInvoice({
      ...invoice,
      items: updatedItems,
    });

    setSelectedProduct(null);
    setQuantity("");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-5">
        Add Product
      </h2>

      <div className="space-y-4">
        <Select
          options={products}
          value={selectedProduct}
          onChange={setSelectedProduct}
          placeholder="Search Product..."
        />

        {selectedProduct && (
          <div className="text-gray-700">
            Price : ₹{selectedProduct.product.price}/kg
          </div>
        )}

        <input
          type="number"
          step="any"
          placeholder="Quantity (kg)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductSearch;