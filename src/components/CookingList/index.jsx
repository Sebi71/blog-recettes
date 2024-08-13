import { Plus } from "lucide-react";
import { useState } from "react";
import Card from "../Card";
import AddCooking from "../AddCooking";
import "./index.scss";

export default function CookingList() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="container-cooking">
      <div className="cooking-content-header">
        <h2 className="cooking-title">Vos recettes</h2>
        <div title="Ajouter une recette">
          <Plus onClick={handleModal} className="cooking-add" />
        </div>
      </div>
      <h3 className="cooking-subtitle">Voici la liste de vos recettes</h3>
      <Card />
      <AddCooking openModal={openModal} handleModal={handleModal} />
    </div>
  );
}
