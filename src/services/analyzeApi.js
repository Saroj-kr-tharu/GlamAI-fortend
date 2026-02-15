import authApi from './authApi';

/**
 * Send an image to the backend for facial analysis.
 * Expects a File/Blob object; sends it as multipart/form-data.
 *
 * @param {File} imageFile - The image file to analyze (JPEG/PNG, max 10 MB).
 * @returns {Promise<{ success: boolean, data?: object, message?: string }>}
 */
export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await authApi.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("response => ", response?.data)

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Analyze API error:', error);
    const message =
      error.response?.data?.message ||
      error.message ||
      'Analysis failed. Please try again.';
    return {
      success: false,
      message,
    };
  }
};
