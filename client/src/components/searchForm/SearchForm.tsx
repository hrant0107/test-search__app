import { useForm, SubmitHandler } from "react-hook-form";
import { IFormData } from "../../types/searchDataType";

import InputMask from "react-input-mask";

import styles from "./SearchForm.module.scss";

type SearchFormProps = {
  getData: (data: IFormData) => Promise<void>;
};

const SearchForm: React.FC<SearchFormProps> = ({ getData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    getData(data);
  };

  return (
    <form className={styles.wraper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputBlock}>
        <div className={styles.input}>
          <label>Email:</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.inputBlock}>
        <div className={styles.input}>
          <label>Number:</label>
          <InputMask
            mask="99-99-99"
            type="text"
            {...register("number", {
              pattern: {
                value: /^[0-9-]{6,}$/,
                message: "6 digits and only numbers and dashes are allowed",
              },
            })}
          />
        </div>
        {errors.number && (
          <span className={styles.error}>{errors.number.message}</span>
        )}
      </div>

      <button className={styles.submit} type="submit">
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
