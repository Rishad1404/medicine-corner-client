import { orderService } from "@/app/services/order.service";
import { OrderTable } from "@/components/modules/seller/order-table";

export default async function SellerOrdersPage() {
  const orders = await orderService.getSellerOrders();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Monitor and fulfill customer medicine orders.
          </p>
        </div>
      </div>

      <OrderTable data={orders} />
    </div>
  );
}
