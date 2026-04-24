import axios from "axios";
import { ENV } from "./env";

const BREVO_API_URL = "https://api.brevo.com/v3";

/**
 * Add a contact to a Brevo list
 * @param email - Email address to subscribe
 * @param listId - Brevo list ID (defaults to ENV.brevoListId)
 * @returns Success status
 */
export async function addContactToBrevoList(
  email: string,
  listId?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const targetListId = listId || ENV.brevoListId;

    if (!ENV.brevoApiKey) {
      console.error("[Brevo] API key not configured");
      return { success: false, message: "Brevo API key not configured" };
    }

    if (!targetListId) {
      console.error("[Brevo] List ID not configured");
      return { success: false, message: "Brevo list ID not configured" };
    }

    const response = await axios.post(
      `${BREVO_API_URL}/contacts`,
      {
        email,
        listIds: [parseInt(targetListId)],
        updateEnabled: true, // Update if contact already exists
      },
      {
        headers: {
          "api-key": ENV.brevoApiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[Brevo] Contact added successfully: ${email}`);
    return { success: true };
  } catch (error: any) {
    // Handle case where contact already exists
    if (error.response?.status === 400 && error.response?.data?.code === "duplicate_parameter") {
      console.log(`[Brevo] Contact already exists: ${email}`);
      return { success: true, message: "Contact already subscribed" };
    }

    console.error("[Brevo] Error adding contact:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to subscribe",
    };
  }
}

/**
 * Get account information to validate API key
 */
export async function validateBrevoApiKey(): Promise<boolean> {
  try {
    const response = await axios.get(`${BREVO_API_URL}/account`, {
      headers: {
        "api-key": ENV.brevoApiKey,
      },
    });

    console.log(`[Brevo] API key validated successfully for account: ${response.data.email}`);
    return true;
  } catch (error: any) {
    console.error("[Brevo] API key validation failed:", error.response?.data || error.message);
    return false;
  }
}
