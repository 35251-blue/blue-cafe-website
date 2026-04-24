import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { sendEmail } from "./_core/email";
import { addContactToBrevoList } from "./_core/brevo";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  newsletter: router({    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
        })
      )
      .mutation(async ({ input }) => {
        const result = await addContactToBrevoList(input.email);
        
        if (!result.success) {
          throw new Error(result.message || "Failed to subscribe to newsletter");
        }

        return { 
          success: true,
          message: result.message || "Successfully subscribed to newsletter"
        };
      }),
  }),

  careers: router({
    submitApplication: publicProcedure
      .input(
        z.object({
          fullName: z.string(),
          email: z.string().email(),
          phone: z.string(),
          previousJob1: z.string(),
          previousJob2: z.string().optional(),
          experience: z.string(),
          availability: z.string(),
          resumeData: z.string(), // base64 encoded file
          resumeFileName: z.string(),
          resumeFileType: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Extract base64 data
        const base64Data = input.resumeData.split(',')[1] || input.resumeData;
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Send email with resume attachment
        const emailHtml = `
          <h2>💼 New Job Application</h2>
          <h3>Position: Cashier / Customer Service</h3>
          <hr />
          <h3>Personal Information:</h3>
          <p><strong>Name:</strong> ${input.fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${input.phone}">${input.phone}</a></p>
          <hr />
          <h3>Work Experience:</h3>
          <p><strong>Previous Job #1:</strong> ${input.previousJob1}</p>
          ${input.previousJob2 ? `<p><strong>Previous Job #2:</strong> ${input.previousJob2}</p>` : ''}
          <p><strong>Customer Service Experience:</strong></p>
          <p>${input.experience.replace(/\n/g, '<br>')}</p>
          <hr />
          <h3>Availability:</h3>
          <p>${input.availability.replace(/\n/g, '<br>')}</p>
          <hr />
          <p><em>Resume attached: ${input.resumeFileName}</em></p>
        `;

        const emailSent = await sendEmail({
          to: "info@bluecafemiami.com",
          subject: `New Job Application: ${input.fullName}`,
          html: emailHtml,
          attachments: [{
            filename: input.resumeFileName,
            content: buffer,
            contentType: input.resumeFileType,
          }],
        });

        if (!emailSent) {
          throw new Error("Failed to send application. Please try again.");
        }

        return { success: true };
      }),
  }),

  events: router({
    submitInquiry: publicProcedure
      .input(
        z.object({
          eventType: z.string(),
          date: z.string(),
          guests: z.number(),
          details: z.string().optional(),
          name: z.string(),
          email: z.string().email(),
          phone: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // Send email to info@bluecafemiami.com
        const emailHtml = `
          <h2>🎉 New Event Inquiry</h2>
          <p><strong>Event Type:</strong> ${input.eventType}</p>
          <p><strong>Date:</strong> ${input.date}</p>
          <p><strong>Number of Guests:</strong> ${input.guests}</p>
          ${input.details ? `<p><strong>Details:</strong> ${input.details}</p>` : ''}
          <hr />
          <h3>Contact Information:</h3>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${input.phone}">${input.phone}</a></p>
        `;

        const emailSent = await sendEmail({
          to: "info@bluecafemiami.com",
          subject: `New Event Inquiry: ${input.eventType} on ${input.date}`,
          html: emailHtml,
        });

        if (!emailSent) {
          throw new Error("Failed to send email notification");
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
