import Button from "@common/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@common/apis/ApiError";
import { useCreateWallMutation } from "../hooks/useCreateWallMutation";
import { wallMessageSchema, type WallMessageForm } from "../constants/schema";

function GroupWallCreateForm({ groupUuid }: { groupUuid: string }) {
  const { mutateAsync: createWallMutation } = useCreateWallMutation(groupUuid);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WallMessageForm>({
    resolver: zodResolver(wallMessageSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = async ({ content }: WallMessageForm) => {
    try {
      await createWallMutation(content);
      reset();
    } catch (error) {
      setError("root", {
        message:
          error instanceof ApiError ? error.message : "게시에 실패했습니다.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full relative">
      <textarea
        placeholder="내용을 입력하세요"
        disabled={isSubmitting}
        className="w-full m-4 ml-0 p-6 min-h-[120px] bg-[#F9F9F9] rounded-2xl disabled:opacity-60"
        {...register("content")}
      />
      <div className="absolute bottom-10 right-8">
        <Button
          text={isSubmitting ? "게시 중..." : "게시하기"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
      {(errors.content || errors.root) && (
        <div className="text-sm text-red-500 mt-2 ml-1">
          {errors.content?.message ?? errors.root?.message}
        </div>
      )}
    </form>
  );
}

export default GroupWallCreateForm;
