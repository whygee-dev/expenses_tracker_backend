export class PutDTO {
  table: string;
  data: {
    id?: string;
    amount: number;
    description: string;
    createdBy: string;
  };
}

export class DeleteDTO {
  table: string;
  data: {
    id: string;
  };
}

export class PatchDTO {
  table: string;
  data: {
    id: string;
    amount: number;
    description: string;
    createdBy: string;
  };
}
