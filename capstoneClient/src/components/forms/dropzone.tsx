/* eslint-disable jsx-a11y/alt-text */
import {
  type MouseEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import clsx from "clsx";
import get from "lodash.get";

import { type Accept, useDropzone, type FileRejection } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";

import FilePreview from "./file-preview";
import { PiUploadSimpleLight } from "react-icons/pi";
import { type IconType } from "react-icons";
import { type FileWithPreview } from "@/type/dropzone";

type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label?: string;
  maxFiles?: number;
  readOnly?: boolean;
  hideError?: boolean;
  isLoading?: boolean;
  clearPicture?: boolean;
  validation?: object;
  leftIconLabel?: IconType | string;
  type?: "image" | "file";
};

export default function DropzoneInput({
  accept,
  helperText = "",
  id,
  label,
  maxFiles = 1,
  validation,
  leftIconLabel: LeftIconLabel,
  readOnly,
  hideError = false,
  isLoading,
  clearPicture,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);

  const [files, setFiles] = useState<FileWithPreview[]>(
    getValues(id) as FileWithPreview[]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        if (
          rejectedFiles[0]?.errors &&
          rejectedFiles[0].errors.length > 0 &&
          rejectedFiles[0].errors[0]?.message
        ) {
          setError(id, {
            type: "manual",
            message: rejectedFiles[0].errors[0].message,
          });
        } else {
          setError(id, {
            type: "manual",
            message: "File upload failed with an unspecified error.",
          });
        }
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          }
        );

        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  useEffect(() => {
    if (clearPicture) {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [clearPicture, id, setValue]);
  useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (e: MouseEvent, file: FileWithPreview) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize: 5000000,
  });

  return (
    <div>
      {label && (
        <div className="flex w-fit items-center gap-2">
          {LeftIconLabel && <LeftIconLabel />}
          <p className="mb-3 block text-sm">{label}</p>
        </div>
      )}
      {readOnly && !(files?.length > 0) ? (
        <div className="cursor-not-allowed rounded-md border py-3 pl-3 pr-4 text-sm">
          Cannot upload files
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className="mt-2 divide-y divide-gray-300 rounded-md">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div className="group" {...getRootProps()} {...field}>
                <input {...getInputProps()} />
                <div
                  className={clsx(
                    "w-full cursor-pointer border  border-primary bg-white p-2 ",
                    label ? "rounded-r-lg rounded-bl-lg" : "rounded-lg",
                    errors[id]
                      ? "border-red-500 group-focus:border-red-500"
                      : "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                >
                  <div className="my-20  flex flex-col items-center justify-center space-y-2 text-center">
                    <PiUploadSimpleLight className="text-[3rem] text-primary" />
                    <p className="text-base font-medium leading-7 text-primary ">
                      Drag or click to select Images
                    </p>
                    <p className="text-base font-medium leading-none text-primary">{`${
                      maxFiles - (files?.length || 0)
                    } file(s) remaining`}</p>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                {helperText !== "" && <p className="text-sm">{helperText}</p>}
              </div>
              {!hideError && error && (
                <p className="mt-2 text-sm text-red-700">
                  {error?.message?.toString()}
                </p>
              )}
              {!readOnly && !!files?.length && (
                <ul className="mt-2  rounded-lg  ">
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                      isLoading={isLoading}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}
