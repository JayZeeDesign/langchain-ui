"use client";
import {
  Button,
  Center,
  Icon,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  HStack,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { TbPlus } from "react-icons/tb";
import { useAsync } from "react-use";
import PageHeader from "@/components/page-header";
import { SIDEBAR_MENU } from "@/lib/sidebar";
import { getPrompTemplates } from "@/lib/api";

export default function PromptTemplatesClientPage() {
  const { loading: isLoading, value: promptTemplates } = useAsync(
    async () => getPrompTemplates,
    [getPrompTemplates]
  );

  return (
    <Stack flex={1} paddingX={4} paddingY={4} spacing={4}>
      <PageHeader
        icon={SIDEBAR_MENU.find(({ id }) => id === "prompt_templates").icon}
        title="Prompt templates"
      >
        <HStack>
          <Button
            leftIcon={<Icon as={TbPlus} />}
            colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
            backgroundColor={useColorModeValue("black", "white")}
            size="sm"
          >
            New template
          </Button>
        </HStack>
      </PageHeader>
      {isLoading && (
        <Center flex={1}>
          <Spinner size="sm" />
        </Center>
      )}
      {!isLoading && promptTemplates.length !== 0 && (
        <TableContainer>
          <Table size="sm">
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}