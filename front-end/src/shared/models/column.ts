export interface column {
  id: string;
  title: string;
  order: number;
}

export interface columnInfoResponse extends column {
  id: string;
  title: string;
}

export interface columnDetailProp {
  activeColumn: boolean;
  onAddNote: () => void;
}
