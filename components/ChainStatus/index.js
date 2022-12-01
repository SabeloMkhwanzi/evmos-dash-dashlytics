import React from "react";
import { Box } from "@chakra-ui/react";
import { Loader, Center, Notification, Text, Group } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import moment from "moment";

// Covalent API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function ChainStatus() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["chainStatus"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/chains/status/?key=${APIKey}`
    );
    return res.json();
  });

  const chainStatus = data?.data?.items[25].synced_block_height;
  const blockedSignedAt = data?.data?.items[25].synced_blocked_signed_at;

  if (isFetching) return (<Center><Loader size="xs" color="green" variant="oval" /></Center>);

  if (error)
    return (
      <Center
        style={{
          position: "fixed",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Fetch Chain Status API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Group spacing={5}>
        <Text c="dimmed" fz="xs">
          Synced Block Height
        </Text>
        <Text fw={500} color="teal">
          {chainStatus}
        </Text>
        <Text c="dimmed" fz="xs">
          {moment(blockedSignedAt).startOf("hour").fromNow()}
        </Text>
      </Group>
    </Box>
  );
}
