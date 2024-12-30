import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  const isCompleted = watch("completed", false); 

  return (
    <Card
      completed={isCompleted}
    >
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {params.id ? "Edit Task" : "Create Task"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}

        {/* Description */}
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description", {
            required: "Description is required",
          })}
        ></Textarea>
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}

        {/* Due Date */}
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          name="date"
          {...register("date", { required: "Date is required" })}
        />
        {errors.date && (
          <p className="text-red-500 text-xs italic">{errors.date.message}</p>
        )}

        {/* Completed */}
        <Label htmlFor="completed">Completed</Label>
        <Input
          type="checkbox"
          name="completed"
          id="completed"
          {...register("completed")}
        />

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/tasks")}
            className="border-gray-500 hover:bg-gray-500 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}