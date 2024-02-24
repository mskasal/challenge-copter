interface Env {
  VOLO_API_URL: string;
}

export default function env(): Env {
  return {
    VOLO_API_URL: import.meta.env.VOLO_API_URL,
  };
}
