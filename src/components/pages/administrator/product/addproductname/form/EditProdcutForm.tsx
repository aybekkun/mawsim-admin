import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { TProductList } from "@/services/administrator/product/product.types";

interface EditProductFormProps {
  editingItem: TProductList;
  setEditingItem: (item: TProductList) => void;
  onEdit: (product: TProductList) => void;
}

const EditProductForm: FC<EditProductFormProps> = ({ editingItem, setEditingItem, onEdit }) => (
  <div className="flex space-x-2">
    <Input
      value={editingItem.productName}
      onChange={(e) => setEditingItem({ ...editingItem, productName: e.target.value })}
    />
    <div className="flex-1">
      <Select
        value={editingItem.type}
        onValueChange={(value) => setEditingItem({ ...editingItem, type: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kilogram">кг</SelectItem>
          <SelectItem value="liter">литр</SelectItem>
          <SelectItem value="unit">штук</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button onClick={() => onEdit(editingItem)} size="icon">
      <Check />
    </Button>
  </div>
);

export default EditProductForm;
