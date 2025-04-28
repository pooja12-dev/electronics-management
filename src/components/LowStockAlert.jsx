export default function LowStockAlerts({ products }) {
  const lowStockProducts = products.filter(
    (product) =>
      product.status === "Out of stock" ||
      product.status === "Low stock" ||
      product.quantity <= product.reorderPoint
  );

  console.log("Filtered low stock products:", lowStockProducts);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
      <div className="bg-white rounded-lg shadow p-4">
        {lowStockProducts.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {lowStockProducts.map((product, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{product.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.sku})
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-red-600 mr-2">⚠️</span>
                  <span className="text-red-600 font-medium">
                    {product.quantity}/{product.reorderPoint}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            All stock levels are good!
          </p>
        )}
      </div>
    </div>
  );
}
