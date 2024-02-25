interface Env {
  VOLO_API_URL: string;
}

export default function env(): Env {
  console.log(import.meta.env)
  return {
    VOLO_API_URL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8080/api",
  };
}
