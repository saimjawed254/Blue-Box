"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchemaType } from "@/src/zod/productSchema";
import { useState } from "react";
import "./addProductForm.css";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_code: "",
      title: "",
      description: "",
      category: "",
      brand: "",
      color: "",
      size: "",
      quantity: 0,
      price: 0,
      mrp: 0,
      discount: 0,
      image_urls: [""],
      tags: [""],
      material: "",
      dimensions: "",
    },
  });

  const [tags, setTags] = useState<string[]>([""]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const handleTagChange = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
    setValue(`tags.${index}`, value);
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
    setValue(`image_urls.${index}`, value);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
    setValue("tags", updated);
  };

  const addImage = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImage = (index: number) => {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updated);
    setValue("image_urls", updated);
  };

  const onSubmit = async (data: ProductSchemaType) => {
    // console.log("Submitted:", data);
    try {
      const res = await fetch("/api/products/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        // console.log("Inserted product:", result.product);
      } else {
        alert("❌ Failed to add product");
        console.error(result);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Product</h2>

      <div className="form-grid">
        <input {...register("product_code")} placeholder="Product Code" />
        <input {...register("title")} placeholder="Title" />
        <input {...register("brand")} placeholder="Brand" />
        <input {...register("category")} placeholder="Category" />
        <input {...register("color")} placeholder="Color" />
        <input {...register("size")} placeholder="Size (e.g. M)" />
        <input
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Quantity"
        />
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
        />
        <input
          type="number"
          {...register("mrp", { valueAsNumber: true })}
          placeholder="MRP"
        />
        <input
          type="number"
          {...register("discount", { valueAsNumber: true })}
          placeholder="Discount"
        />
      </div>

      <textarea
        {...register("description")}
        placeholder="Description"
        rows={4}
      />
      <input {...register("material")} placeholder="Material (optional)" />
      <input {...register("dimensions")} placeholder="Dimensions (optional)" />

      {/* Tags */}
      <div className="group-section">
        <label>Tags</label>
        {tags.map((tag, index) => (
          <div className="field-row" key={index}>
            <input
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              placeholder={`Tag ${index + 1}`}
            />
            <button type="button" onClick={() => removeTag(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addTag}>
          + Add Tag
        </button>
      </div>

      {/* Image URLs */}
      <div className="group-section">
        <label>Image URLs</label>
        {imageUrls.map((url, index) => (
          <div className="field-row" key={index}>
            <input
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Image URL ${index + 1}`}
            />
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addImage}>
          + Add Image
        </button>
      </div>

      <button type="submit">Submit</button>

      <pre>
        {JSON.stringify(
          Object.fromEntries(
            Object.entries(errors).map(([key, val]) => [key, val?.message])
          ),
          null,
          2
        )}
      </pre>
    </form>
  );
}
