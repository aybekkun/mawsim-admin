import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TProductList } from "@/services/administrator/product/product.types";

interface AddProductFormProps {
  isCreating: boolean;
  newItem: Omit<TProductList, "id">;
  setNewItem: (item: Omit<TProductList, "id">) => void;
  onCreate: () => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ newItem, setNewItem, onCreate ,isCreating}) => (
  <div className="flex space-x-2">
    <div className="flex-1">
      <Label htmlFor="name">Название</Label>
      <Input
        id="name"
        value={newItem.productName}
        onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
        placeholder="Пишите название продукта"
      />
    </div>
    <div className="flex-1">
      <Label htmlFor="type">Тип</Label>
      <Select value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value })}>
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
    <Button disabled={isCreating} onClick={onCreate} className="mt-6">
      Добавить
    </Button>
  </div>
);

export default AddProductForm;
