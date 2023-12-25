import * as React from "react";
import { type FileWithPreview } from "@/type/dropzone";

import { HiOutlineExternalLink, HiOutlinePaperClip, HiX } from "react-icons/hi";
import { AiOutlineFile, AiOutlineLoading } from "react-icons/ai";

type FilePreviewProps = {
  file: FileWithPreview;
  isLoading?: boolean;
} & (
  | {
      deleteFile?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: true;
    }
  | {
      deleteFile: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        file: FileWithPreview
      ) => void;
      readOnly?: false;
    }
);

export default function FilePreview({
  deleteFile,
  file,
  readOnly,
  isLoading,
}: FilePreviewProps): React.ReactElement {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteFile?.(e, file);
  };

  const imagesType = ["application/pdf"];

  return imagesType.includes(file.type) ? (
    <>
      <li
        className="mb-2 flex min-h-[2.25rem] items-center justify-between rounded-md border-2 border-[#ccd3df] bg-white py-0 pl-3 pr-4 text-sm"
        key={file.name}
      >
        <div className="flex w-0 flex-1 items-center">
          <AiOutlineFile className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="ml-2 w-0 flex-1 ">{file.name}</span>
        </div>
        <div className="ml-4 flex shrink-0 items-center space-x-2">
          {!readOnly && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded text-xl font-medium text-red-600 hover:text-red-700 focus:outline-none focus:ring focus:ring-red-500"
            >
              <HiX />
            </button>
          )}
        </div>
      </li>
    </>
  ) : (
    <li
      key={file.name}
      className="mb-2 flex min-h-[2.25rem] items-center justify-between rounded-md border border-primary bg-white py-0 pl-3 pr-4 text-sm md:min-h-[2.5rem]"
    >
      <div className="flex w-0 flex-1 items-center">
        <HiOutlinePaperClip
          className="h-5 w-5 shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <span className="ml-2 w-0 flex-1 truncate">{file.name}</span>
      </div>
      {isLoading ? (
        <div>
          <AiOutlineLoading className="animate-spin" />
        </div>
      ) : (
        <div className="ml-4 flex shrink-0 items-center space-x-2">
          <a
            href={file.preview}
            className="rounded text-gray-500 hover:text-gray-700 focus:outline-none focus:ring focus:ring-primary"
            target="_blank"
          >
            <HiOutlineExternalLink size={20} />
          </a>
          {!readOnly && (
            <button
              className="cursor-pointer rounded text-danger focus:outline-none focus:ring focus:ring-red-500 "
              type="button"
              onClick={(e) => deleteFile?.(e, file)}
            >
              <HiX size={24} />
            </button>
          )}
        </div>
      )}
    </li>
  );
}
