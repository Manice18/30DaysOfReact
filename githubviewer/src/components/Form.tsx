import { useState, SyntheticEvent } from "react";
import ProfileViewer from "./Profile";
import { Input,Button,Stack } from "@chakra-ui/react";


const FormX = () => {
    const [formValues, setFormValues] = useState<object>({
      name: "",
    });
    const [isFormVisible, setIsFormVisible] = useState(true);

    const handleChange = (event: SyntheticEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setIsFormVisible(false);
    };

    return (
    <>
      {isFormVisible ? (
        <form onSubmit={handleSubmit} className="row" autoComplete="off">
            <Stack spacing={4}>
            <Input
              placeholder="Enter your GitHub Username"
              name="name"
              value={formValues?.name}
              onChange={handleChange}
            />
          <Button type="submit" className="color-primary">
            Go !
          </Button>
          </Stack>
        </form>
      ) : (
        <ProfileViewer data={formValues} />
      )}
    </>
  );
};

export default FormX;