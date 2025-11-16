"use client";

export function todayDateOnly() {
  return new Date().toISOString().split("T")[0];
}

export function toDateTimeString(dateOnly: string) {
  if (!dateOnly) {
    return new Date().toISOString();
  }

  const isoCandidate = `${dateOnly}T00:00:00`;
  const date = new Date(isoCandidate);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}


