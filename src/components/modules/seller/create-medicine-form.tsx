"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Package, 
  Save,
  CalendarIcon,
  Tag,
  Info,
  Layers
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { createMedicine } from "@/actions/medicine.actions";

interface Category {
  id: string;
  name: string;
}

interface CreateMedicineFormProps {
  categories: Category[];
}

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  description: z.string().min(0, "Description is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.string().min(0, "Image is required"),
  expiryDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Expiry date must be in the future",
  }),
});

export function CreateMedicineForm({ categories }: CreateMedicineFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      manufacturer: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      image: "",
      expiryDate: "", 
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating Medicine...");
      const medicineData = {
        ...value,
        price: Number(value.price),
        stock: Number(value.stock),
        expiryDate: new Date(value.expiryDate),
      };

      try {
        const res=await createMedicine(medicineData)
        if(res.error){
            toast.error(res.error.message, { id: toastId });
        }

        toast.success("Medicine created successfully", { id: toastId });
        router.push("/seller/medicines");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    // 1. WIDER CONTAINER
    <div className="w-full max-w-[1600px] mx-auto space-y-6 pb-20 p-4">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/seller/medicines">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to list a new medicine.
          </p>
        </div>
      </div>

      <Separator />

      <form
        id="medicine-post"
        // 2. THREE COLUMN GRID LAYOUT
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* === COLUMN 1: GENERAL INFO === */}
        <div className="space-y-6">
          <Card className="h-full border-l-4 border-l-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle>General Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form.Field
                name="name"
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor="name">Medicine Name</FieldLabel>
                    <Input
                      id="name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Napa Extra"
                      className="font-medium"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="manufacturer"
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel htmlFor="manufacturer">Manufacturer / Brand</FieldLabel>
                    <Input
                      id="manufacturer"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Beximco"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="description"
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Detail usage instructions..."
                      className="min-h-[180px] resize-none"
                    />
                  </Field>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* === COLUMN 2: INVENTORY & PRICING === */}
        <div className="space-y-6">
          <Card className="h-full border-l-4 border-l-blue-500/20">
             <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                <CardTitle>Inventory & Pricing</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Price */}
               <form.Field
                  name="price"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel>Unit Price (Tk)</FieldLabel>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground flex items-center justify-center font-bold">
                        ৳
                      </span>
                        <Input
                          type="number"
                          className="pl-9 text-lg font-semibold"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                          placeholder="0.00"
                        />
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                <div className="grid  gap-4">
                  {/* Stock */}
                  <form.Field
                    name="stock"
                    children={(field) => (
                      <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                        <FieldLabel>Stock</FieldLabel>
                        <div className="relative">
                          <Package className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            className="pl-9"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(Number(e.target.value))}
                          />
                        </div>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                  
                  {/* Expiry */}
                  <form.Field
                    name="expiryDate"
                    children={(field) => (
                      <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                        <FieldLabel>Expiry Date</FieldLabel>
                        <div className="relative">
                          {/* <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                           <Input
                            type="date"
                            // className="pl-9"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                </div>
            </CardContent>
          </Card>
        </div>

        {/* === COLUMN 3: CATEGORY & MEDIA === */}
        <div className="space-y-6">
           {/* Organization */}
           <Card className="border-l-4 border-l-purple-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-purple-500" />
                <CardTitle>Categorization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form.Field
                name="categoryId"
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(categories) && categories.length > 0 ? (
                           categories.map((cat: any) => (
                             <SelectItem key={cat.id || cat._id} value={cat.id || cat._id}>
                               {cat.name}
                             </SelectItem>
                           ))
                        ) : (
                           <div className="p-2 text-sm text-center text-muted-foreground">
                             No categories found
                           </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="border-l-4 border-l-orange-500/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-orange-500" />
                <CardTitle>Product Image</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <form.Field
                name="image"
                children={(field) => (
                  <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                    
                    {/* Compact Image Preview */}
                    <div className="flex gap-4 items-start">
                        <div className="h-24 w-24 flex-shrink-0 rounded-md border border-dashed bg-muted flex items-center justify-center relative overflow-hidden group">
                        {field.state.value ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                                src={field.state.value} 
                                alt="Preview" 
                                className="object-cover w-full h-full"
                                onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
                            />
                        ) : (
                            <ImageIcon className="h-8 w-8 opacity-20" />
                        )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="relative">
                            <Upload className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="pl-9"
                                placeholder="Image URL..."
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                            </div>
                            <p className="text-xs text-muted-foreground">Paste a direct image link.</p>
                        </div>
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* === BOTTOM ACTION BAR (Full Width) === */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
             <div className="bg-card border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm">
                 <div className="text-sm text-muted-foreground hidden sm:block">
                    Ensure all details are correct before creating.
                 </div>
                 <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Button variant="ghost" size="lg" className="flex-1 sm:flex-none" asChild>
                        <Link href="/dashboard/seller/medicines">Cancel</Link>
                    </Button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                        <Button type="submit" size="lg" className="flex-1 sm:flex-none min-w-[200px]" disabled={!canSubmit}>
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⏳</span> Processing...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="h-4 w-4" /> Create Medicine
                                </span>
                            )}
                        </Button>
                        )}
                    />
                 </div>
             </div>
        </div>

      </form>
    </div>
  );
}