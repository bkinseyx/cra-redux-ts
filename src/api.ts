export const submitDemoFormApi = async (formData: any) =>
  new Promise<string | null>((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() < 0.5
          ? resolve("The form was submitted successfully.")
          : reject(
              "The server returned an unspecified error. Please try again."
            ),
      1000
    );
  });
