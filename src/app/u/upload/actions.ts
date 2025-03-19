"use server";

import * as XLSX from "xlsx";

export async function mergeAndCreateFile(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    const manualCallerIdsJSON = formData.get("manualCallerIds") as string;
    const manualCallerIds = JSON.parse(manualCallerIdsJSON);

    let callerIds: string[] = [];

    // Process uploaded file
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      callerIds = data.flat().map(String);
    }

    // Merge with manual caller IDs
    callerIds = [...new Set([...callerIds, ...manualCallerIds])];

    // Create new workbook and sheet
    const newWorkbook = XLSX.utils.book_new();
    const newSheet = XLSX.utils.aoa_to_sheet(callerIds.map((id) => [id]));
    XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Caller IDs");

    // Generate file buffer
    const buffer = XLSX.write(newWorkbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Convert buffer to Blob and create a File
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const newFile = new File([blob], "merged_caller_ids.xlsx", {
      type: blob.type,
    });

    // Create FormData and append the file
    const resultFormData = new FormData();
    resultFormData.append("file", newFile);

    return resultFormData;
  } catch (error) {
    console.error("Error in mergeAndCreateFile:", error);
    return null; // or throw an error if needed
  }
}
