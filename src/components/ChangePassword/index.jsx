import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Undo2 } from 'lucide-react';
import { Link } from "react-router-dom";
import "./index.scss";

export default function ChangePassword() {
  return (
    <section className="container-change-password">
        <Link to="/dashboard">
        <Undo2 className="logo-return"/>
        </Link>
      <form className="form-password">
        <Space direction="vertical">
          <label htmlFor="old-password" className="label-title">Mot de passe actuel</label>
          <Input.Password
            id="old-password"
            name="old-password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <label htmlFor="new-password" className="label-title">Nouveau mot de passe</label>
          <Input.Password
            id="new-password"
            name="new-password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <label htmlFor="confirm-password" className="label-title">
            Confirmer le nouveau mot de passe
          </label>
          <Input.Password
            id="confirm-password"
            name="confirm-password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Space>
        <button className="button" type="submit">Mettre à jour le mot de passe</button>
      </form>
    </section>
  );
}
