import React, { useState } from "react";
import { Button, Stack, TextInput } from "@mantine/core";
import Service from "../../utils/http";

export const Urlshortner = () => {
  const service = new Service();

  const [originalUrl, setOriginalUrl] = useState("");
  const [customLink, setCustomLink] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!originalUrl.trim()) return;

    try {
      const payload = { originalUrl: originalUrl.trim(), customUrl: customLink.trim() };
      if (linkTitle) payload.linkTitle = linkTitle.trim();
      if (expiryDate) payload.expiryDate = expiryDate;

      const response = await service.post("short-url", payload);
      setShortUrl(response?.shortUrl ?? response?.data?.shortUrl ?? "");
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <Stack spacing="md" style={{ maxWidth: 600, margin: "0 auto" }}>
      <TextInput
        size="sm"
        radius="sm"
        label="Original URL"
        withAsterisk
        placeholder="Paste your url here"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.currentTarget.value)}
      />
      <TextInput
        size="sm"
        radius="sm"
        label="Customize your link (Optional)"
        placeholder="Customize your link"
        value={customLink}
        onChange={(e) => setCustomLink(e.currentTarget.value)}
      />
      <TextInput
        size="sm"
        radius="sm"
        label="Title (Optional)"
        placeholder="Title of the link"
        value={linkTitle}
        onChange={(e) => setLinkTitle(e.currentTarget.value)}
      />
      <TextInput
        size="sm"
        radius="sm"
        label="Expiry Date (Optional)"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.currentTarget.value)}
      />
      <Button variant="filled" color="blue" size="sm" radius="sm" onClick={handleShorten}>
        Shorten
      </Button>

      {shortUrl ? (
        <TextInput size="sm" radius="sm" label="Short URL" value={shortUrl} readOnly />
      ) : null}
    </Stack>
  );
};

export default Urlshortner;