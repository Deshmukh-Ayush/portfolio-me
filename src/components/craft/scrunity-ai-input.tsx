"use client";

import React, { useRef, useState } from "react";
import { Plus, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

const COMMAND_OPTIONS = [
  {
    key: "summarize",
    label: "/summarize",
    description: "Generate executive summary",
    command: "/summarize workspace",
  },
  {
    key: "analyze-revenue",
    label: "/analyze-revenue",
    description: "Analyze won revenue & risks",
    command: "/analyze-revenue",
  },
  {
    key: "review-deliverables",
    label: "/review-deliverables",
    description: "Audit pending deliverables",
    command: "/review-deliverables",
  },
  {
    key: "draft-contract",
    label: "/draft-contract",
    description: "Draft SOW scope & terms",
    command: "/draft-contract",
  },
];

const PROJECT_OPTIONS = [
  { id: "1", name: "Acme Client Portal" },
  { id: "2", name: "Scrunity Engine" },
  { id: "3", name: "Design System V2" },
];

export const ScrunityAiInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showMentionMenu, setShowMentionMenu] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    setText(val);

    const el = textareaRef.current;

    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }

    if (val.endsWith("/")) {
      setShowSlashMenu(true);
      setShowMentionMenu(false);
    } else if (val.endsWith("@")) {
      setShowSlashMenu(false);
      setShowMentionMenu(true);
    } else {
      setShowSlashMenu(false);
      setShowMentionMenu(false);
    }
  };

  const selectCommand = (command: string) => {
    setText(command);
    setShowSlashMenu(false);

    textareaRef.current?.focus();
  };

  const selectProject = (projectName: string) => {
    setText((prev) => `${prev}${projectName} `);
    setShowMentionMenu(false);

    textareaRef.current?.focus();
  };

  return (
    <div className="relative w-3xl">
      {showSlashMenu && <SlashMenu selectCommand={selectCommand} />}

      {showMentionMenu && <MentionMenu selectProject={selectProject} />}

      <div className="flex min-h-[100px] w-full flex-col justify-between rounded-[14px] border border-[#E8E8E8] bg-white shadow-[1px_0px_4px_0px_rgba(0,0,0,0.06),0px_1px_4px_0px_rgba(0,0,0,0.06)] transition-all focus-within:border-gray-300 focus-within:shadow-sm">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          name="prompt"
          id="promptId"
          rows={1}
          placeholder="Ask anything or @ to add context"
          className="max-h-[160px] w-full flex-1 resize-none bg-transparent p-3 text-[16px] text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm"
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <button
            type="button"
            onClick={() => {
              setShowSlashMenu((prev) => !prev);
              setShowMentionMenu(false);
            }}
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border border-[#E8E8E8] bg-white text-neutral-500 transition-colors hover:bg-gray-100 hover:text-gray-900 active:scale-[0.97]"
          >
            <Plus className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] bg-[#0088C4] text-white transition-opacity active:scale-[0.97] disabled:opacity-40"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SlashMenu = ({
  selectCommand,
}: {
  selectCommand: (command: string) => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute bottom-full left-0 mb-2 w-72 rounded-[12px] border border-[#E8E8E8] bg-white p-1.5">
      <div className="px-2 py-1 text-[11px] font-medium text-neutral-400">
        Commands
      </div>

      <div className="flex flex-col gap-0.5">
        {COMMAND_OPTIONS.map((cmd, idx) => (
          <button
            key={cmd.key}
            type="button"
            onClick={() => selectCommand(cmd.command)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex w-full flex-col rounded-md px-2.5 py-1.5 text-left"
          >
            {hovered === idx && (
              <motion.span
                layoutId="slash-menu-hover"
                className="absolute inset-0 rounded-md bg-neutral-200"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            <span className="relative z-10 text-xs font-medium text-neutral-900">
              {cmd.label}
            </span>

            <span className="relative z-10 text-[11px] text-neutral-500">
              {cmd.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MentionMenu = ({
  selectProject,
}: {
  selectProject: (projectName: string) => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute bottom-full left-0 mb-2 w-64 rounded-[12px] border border-[#E8E8E8] bg-white p-1.5">
      <div className="px-2 py-1 text-[11px] font-medium text-neutral-400">
        Projects
      </div>

      <div className="flex flex-col gap-0.5">
        {PROJECT_OPTIONS.map((proj, idx) => (
          <button
            key={proj.id}
            type="button"
            onClick={() => selectProject(proj.name)}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            className="group relative flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs font-medium text-neutral-900"
          >
            {hovered === idx && (
              <motion.span
                layoutId="mention-menu-hover"
                className="absolute inset-0 rounded-md bg-neutral-200"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}

            <span className="relative z-10">📁</span>

            <span className="relative z-10">{proj.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
