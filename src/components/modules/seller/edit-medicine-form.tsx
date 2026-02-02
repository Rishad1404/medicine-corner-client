"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Medicine } from "./medicine-table";
import { updateMedicineServerAction } from "@/actions/medicine.actions";

interface EditMedicineModalProps {
  medicine: Medicine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMedicineModal({
  medicine,
  open,
  onOpenChange,
}: EditMedicineModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      manufacturer: "",
      price: "",
      stock: "",
      expiryDate: "",
      description: "",
      imageUrl: "",
    },
    onSubmit: async ({ value }) => {
      if (!medicine?.id) {
        toast.error("Medicine ID is missing");
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Updating medicine...");

      try {
        const payload = {
          name: value.name,
          manufacturer: value.manufacturer,
          price: Number(value.price),
          stock: Number(value.stock),
          expiryDate: new Date(value.expiryDate).toISOString(),
          description: value.description,
          image: value.imageUrl,
        };

        const result = await updateMedicineServerAction(
          medicine.id,
          payload
        );

        if (!result.success) {
          throw new Error(result.message || "Update failed");
        }

        toast.success("Medicine updated successfully", { id: toastId });
        onOpenChange(false);
        router.refresh();
        router.push("/seller/medicines");
      } catch (error: any) {
        toast.error(error.message || "Failed to update", { id: toastId });
      } finally {
        setLoading(false);
      }
    },
  });

  // Populate form when modal opens
  useEffect(() => {
    if (medicine && open) {
      form.setFieldValue("name", medicine.name ?? "");
      form.setFieldValue("manufacturer", medicine.manufacturer ?? "");
      form.setFieldValue("price", String(medicine.price ?? ""));
      form.setFieldValue("stock", String(medicine.stock ?? ""));
      form.setFieldValue(
        "expiryDate",
        medicine.expiryDate
          ? new Date(medicine.expiryDate).toISOString().split("T")[0]
          : ""
      );
      form.setFieldValue("description", medicine.description ?? "");
      form.setFieldValue("imageUrl", medicine.image ?? "");
    }
  }, [medicine, open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
          <DialogDescription>
            Update details for{" "}
            <span className="font-medium text-foreground">
              {medicine?.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        {/* 🔴 NOT A FORM — prevents native POST */}
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="manufacturer">
              {(field) => (
                <div className="space-y-2">
                  <Label>Manufacturer</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <Label>Price (৳)</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="stock">
              {(field) => (
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="expiryDate">
              {(field) => (
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="imageUrl">
            {(field) => (
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <div className="flex items-center justify-end gap-3 pt-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={loading}
              className="min-w-[120px]"
              onClick={() => form.handleSubmit()}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
