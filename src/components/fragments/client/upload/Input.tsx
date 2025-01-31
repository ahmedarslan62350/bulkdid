"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { ManualInputProps } from "@/utils/types";

export function ManualInput({ onManualInput }: ManualInputProps) {
  const [callerIdInput, setCallerIdInput] = useState("");
  const [callerIds, setCallerIds] = useState<string[]>([]);

  useEffect(() => {
    onManualInput(callerIds);
  }, [callerIds, onManualInput]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (callerIdInput.trim()) {
      const newCallerIds = callerIdInput
        .split(/[\n,]+/) // Split by newline or comma
        .map((id) => id.trim())
        .filter((id) => id !== "");
      setCallerIds((prevIds) => [...prevIds, ...newCallerIds]);
      setCallerIdInput("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manually Add Caller IDs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="caller-id">Enter Caller IDs</Label>
            <Textarea
              id="caller-id"
              value={callerIdInput}
              onChange={(e) => setCallerIdInput(e.target.value)}
              placeholder="Enter caller IDs (one per line or comma-separated)"
              rows={5}
            />
          </div>
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Add Caller IDs
          </Button>
        </form>
        {callerIds.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Added Caller IDs:</h3>
            <ul className="list-disc pl-5 max-h-60 overflow-y-auto">
              {callerIds.map((id, index) => (
                <li key={index}>{id}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
