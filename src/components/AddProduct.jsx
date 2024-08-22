import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { useProductActions } from "../ProductStore/ProductStore";
import { nanoid } from "nanoid";
import { db } from "./config/Firebase";

function AddProduct() {
  const { addProduct } = useProductActions();
  const { clearProducts } = useProductActions();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [name, setName] = useState("");
  const [definition, setDefinition] = useState("");
  const [description, setDescription] = useState("");
  const [sale, setSale] = useState(false);
  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [imagePreview, setImagePreview] = useState("");

  const renderMenuItems = () => {
    switch (category) {
      case "Bracelet":
        return [
          <MenuItem key="Bronze" value="Bronze">
            Bronze
          </MenuItem>,
          <MenuItem key="Gold" value="Gold">
            Gold
          </MenuItem>,
          <MenuItem key="Leather" value="Leather">
            Leather
          </MenuItem>,
        ];
      case "Sunglasses":
        return [
          <MenuItem key="Aviator" value="Aviator">
            Aviator
          </MenuItem>,
          <MenuItem key="Sport" value="Sport">
            Sport
          </MenuItem>,
          <MenuItem key="Wayfarer" value="Wayfarer">
            Wayfarer
          </MenuItem>,
        ];
      case "Watch":
        return [
          <MenuItem key="Smart" value="Smart">
            Smart
          </MenuItem>,
          <MenuItem key="Sport" value="Sport">
            Sport
          </MenuItem>,
        ];
      default:
        return [];
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log(file.name);
    }
  };

  const handleSubmit = async () => {
    if (name && category && definition && description && (price || newPrice)) {
      const newProduct = {
        image: image,
        name: name,
        category: category,
        subcategory: subcategory,
        definition: definition,
        description: description,
        sale: sale,
        oldPrice: oldPrice,
        newPrice: sale ? newPrice : price,
      };

      addProduct(newProduct);
      setImagePreview("");
      setImage(null);
      setCategory("");
      setSubcategory("");
      setName("");
      setDefinition("");
      setDescription("");
      setSale(false);
      setOldPrice(0);
      setNewPrice(0);
      setPrice(0);
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="w-full p-5 text-black tabletLandscape:px-56">
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Image</h4>
        <TextField
          type="file"
          onChange={handleImageUpload}
          required
          className="mb-4"
          id="image"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Selected"
            className="object-cover w-20 h-20 mt-4"
          />
        )}
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Name</h4>
        <TextField
          id="name"
          label="Name"
          fullWidth
          required
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Definition</h4>
        <TextField
          id="definition"
          label="Definition"
          fullWidth
          multiline
          required
          rows={2}
          variant="outlined"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Description</h4>
        <TextField
          id="description"
          label="Description"
          fullWidth
          multiline
          required
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => {
            const value = e.target.value.replace(/\n/g, "<br><br>");
            setDescription(value);
          }}
        />
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Category</h4>
        <FormControl fullWidth>
          <InputLabel id="label-category">Category</InputLabel>
          <Select
            labelId="label-category"
            id="category-select"
            value={category}
            required
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
          >
            <MenuItem value="Bracelet">Bracelet</MenuItem>
            <MenuItem value="Sunglasses">Sunglasses</MenuItem>
            <MenuItem value="Watch">Watch</MenuItem>
          </Select>
        </FormControl>
      </div>
      {category && (
        <div className="mb-4">
          <h4 className="mb-2 text-3xl">{category}</h4>
          <FormControl fullWidth>
            <InputLabel id="label-subcategory">{category}</InputLabel>
            <Select
              labelId="label-subcategory"
              id="subcategory-select"
              value={subcategory}
              required
              label={category}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              {renderMenuItems()}
            </Select>
          </FormControl>
        </div>
      )}
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Price</h4>
        <TextField
          type="number"
          id="price"
          label="Price"
          fullWidth
          disabled={sale}
          required
          variant="outlined"
          value={price}
          onFocus={() => setPrice("")}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <h4 className="mb-2 text-3xl">Sale</h4>
        <FormControlLabel
          control={
            <Checkbox
              checked={sale}
              onChange={(e) => setSale(e.target.checked)}
            />
          }
          label="Do you want to create a sale offer on this product?"
        />
      </div>
      {sale && (
        <div className="flex flex-row space-x-3">
          <div className="mb-4">
            <h4 className="mb-2 text-3xl">Old Price</h4>
            <TextField
              type="number"
              id="oldPrice"
              label="Old Price"
              fullWidth
              required
              onFocus={() => setOldPrice("")}
              variant="outlined"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h4 className="mb-2 text-3xl">New Price</h4>
            <TextField
              type="number"
              id="newPrice"
              label="New Price"
              fullWidth
              required
              onFocus={() => setNewPrice("")}
              variant="outlined"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="submit"
        >
          Add Product
        </Button>
      </div>

      <button onClick={() => clearProducts()}>Clear All Products</button>
    </div>
  );
}

export default AddProduct;
