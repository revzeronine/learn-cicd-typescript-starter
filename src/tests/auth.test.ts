import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "../api/auth.js";
import { describe, expect, test } from "vitest";

describe("API Key", () => {


  test("Get key from 'authorization' header", () => {
    const header: IncomingHttpHeaders = {
      "authorization": "ApiKey 12345678"
    };
    expect(getAPIKey(header)).toBe("12345678");
  })

  test("Get null when missing ApiKey prefix", () => {
    const header: IncomingHttpHeaders = {
      "authorization": "1234567"
    }
    expect(getAPIKey(header)).toBe(null);
  })

  test("Get null when missing apikey value", () => {
    const header: IncomingHttpHeaders = {
      "authorization": "ApiKey"
    }
    expect(getAPIKey(header)).toBe(null);
  })

  test("Get null when no authorization header is present", () => {
    const header: IncomingHttpHeaders = {}
    expect(getAPIKey(header)).toBe(null);
  })

  test("Get null when authorization header is malformed", () => {
    const header: IncomingHttpHeaders = {
      "authorization": "SomeApiKey 123445"
    }
    expect(getAPIKey(header)).toBe(null);
  })
});