import { FormInput } from "@components/form/formik";
import KBButton from "@components/form/KBButton";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { ITaskFormPayload } from "type";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

interface Props {
  initialValues: ITaskFormPayload;
  onSubmit: (values: ITaskFormPayload) => void;
}

const TaskForm: FC<Props> = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        //   setIsEdit(false);
        //   onUpdateTask(columnId, index, Object.assign(task, values));
        onSubmit(values);
      }}
    >
      {() => (
        <Form>
          <Box>
            <FormInput name="title" label="Title" required sx={{ mb: 3 }} />

            <FormInput name="description" label="Description" required />

            <KBButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Save
            </KBButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
