import type { FormEvent } from "react";
import { gameStatuses, type Game, type GameStatus } from "../types/game";
import { platforms } from "../data/gamesdata";

export type GameFormValues = Omit<Game, "id">;
export type GameFormErrors = Partial<Record<keyof GameFormValues, string>>;

type GameFormProps = {
  form: GameFormValues;
  errors: GameFormErrors;
  isEditing: boolean;
  onChange: (field: keyof GameFormValues, value: GameFormValues[keyof GameFormValues]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function GameForm({ form, errors, isEditing, onChange, onSubmit, onCancel }: GameFormProps) {
  return (
    <section className="gameFormSection" aria-labelledby="gameFormTitle">
      <div className="sectionTitleRow">
        <h2 id="gameFormTitle">{isEditing ? "แก้ไขเกม" : "เพิ่มเกมในรายการ"}</h2>
        {isEditing && <button className="textButton" type="button" onClick={onCancel}>ยกเลิก</button>}
      </div>
      <form className="gameForm" onSubmit={onSubmit} noValidate>
        <label className="gameField gameNameField">
          <span>ชื่อเกม</span>
          <input value={form.name} onChange={(event) => onChange("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} placeholder="เช่น Disco Elysium" />
          {errors.name && <small className="fieldError" id="name-error">{errors.name}</small>}
        </label>
        <label className="gameField">
          <span>แพลตฟอร์ม</span>
          <select value={form.platform} onChange={(event) => onChange("platform", event.target.value)} aria-invalid={Boolean(errors.platform)} aria-describedby={errors.platform ? "platform-error" : undefined}>
            <option value="">เลือกแพลตฟอร์ม</option>
            {platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
          </select>
          {errors.platform && <small className="fieldError" id="platform-error">{errors.platform}</small>}
        </label>
        <label className="gameField hoursField">
          <span>ชั่วโมงโดยประมาณ</span>
          <input type="number" min="1" step="1" value={form.hours} onChange={(event) => onChange("hours", Number(event.target.value))} aria-invalid={Boolean(errors.hours)} aria-describedby={errors.hours ? "hours-error" : undefined} />
          {errors.hours && <small className="fieldError" id="hours-error">{errors.hours}</small>}
        </label>
        <label className="gameField">
          <span>สถานะ</span>
          <select value={form.status} onChange={(event) => onChange("status", event.target.value as GameStatus)}>
            {gameStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>
        <button className="primaryGameButton" type="submit">{isEditing ? "บันทึกการแก้ไข" : "เพิ่มเกม"}</button>
      </form>
    </section>
  );
}