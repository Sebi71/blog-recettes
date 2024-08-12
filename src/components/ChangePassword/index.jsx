import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Undo2 } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import useAuthActions from "../../hook/authActions";
import { changePasswordSchema } from "../../schemas/authSchemas";
import "./index.scss";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePassword } = useAuthActions();
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await changePassword(data.oldPassword, data.newPassword);
      localStorage.setItem("toastMessage", "Mot de passe modifié avec succès");
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReturn = () => {
    navigate("/dashboard");
  };

  return (
    <section className="container-change-password">
        <Undo2  onClick={handleReturn} className="logo-return" />
      <h1 className="title-change-password">Modifier votre mot de passe</h1>
      <form className="form-password" onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical">
          <label htmlFor="oldPassword" className="label-title">
            Mot de passe actuel
          </label>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                id="oldPassword"
                {...field}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
          {errors.oldPassword && (
            <span className="error">{errors.oldPassword.message}</span>
          )}

          <label htmlFor="newPassword" className="label-title">
            Nouveau mot de passe
          </label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                id="newPassword"
                {...field}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
          {errors.newPassword && (
            <span className="error">{errors.newPassword.message}</span>
          )}

          <label htmlFor="confirmNewPassword" className="label-title">
            Confirmer le nouveau mot de passe
          </label>
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                id="confirmNewPassword"
                {...field}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}
          />
          {errors.confirmNewPassword && (
            <span className="error">
              {errors.confirmNewPassword.message}
            </span>
          )}

          {error && <span className="error">{error}</span>}
        </Space>
        <button className="button" type="submit" aria-label="Validation du formulaire">
          Mettre à jour le mot de passe
        </button>
      </form>
    </section>
  );
}
