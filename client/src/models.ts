export type FlightStatus = "pre" | "now" | "post";

export type FlightType = {
  id: string;
  title: string;
  desc: string;
  status: FlightStatus;
};

export type FlightTypePreview = Omit<FlightType, 'id'>;
