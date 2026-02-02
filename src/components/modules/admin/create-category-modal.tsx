"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2, Image as ImageIcon, Pencil, Save } from "lucide-react";
import { createCategoryAction, updateCategoryAction } from "@/actions/category.actions";
import { toast } from "sonner";

interface CategoryModalProps {
  category?: { id: string; name: string; image?: string };
  mode: "create" | "edit";
}

export function CategoryFormModal({ category, mode }: CategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      image: formData.get("image") as string,
    };

    const result = mode === "create" 
      ? await createCategoryAction(payload) 
      : await updateCategoryAction(category!.id, payload);

    if (result.success) {
      toast.success(mode === "create" ? "Category Created" : "Category Updated");
      setOpen(false);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "create" ? (
          <Button className="h-12 rounded-2xl bg-indigo-600 font-black px-6 uppercase tracking-widest text-[10px]">
            <Plus className="h-4 w-4 mr-2" /> Add Category
          </Button>
        ) : (
          <Button variant="outline" className="h-9 w-9 p-0 border-2 border-slate-200 text-indigo-600">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] p-8 border-none dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-center">
            {mode === "create" ? "New Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Label Name</label>
            <Input name="name" defaultValue={category?.name} placeholder="e.g. Herbal Medicine" required className="h-12 rounded-2xl border-2" />
          </div>

          {/* Image Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Icon/Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input name="image" defaultValue={category?.image} placeholder="https://image-url.com/icon.png" className="h-12 pl-11 rounded-2xl border-2" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl bg-slate-900 font-black uppercase tracking-widest mt-4">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "create" ? "Add to Registry" : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}