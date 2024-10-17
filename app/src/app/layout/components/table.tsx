import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@hanzo/ui/primitives"

const luxData = [
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
  {
    period: "#0",
    LUXDistributed: "2,000,000 LUX",
    totalUSD: "12,000 USD",
    effectivePrice: "0.000132 USD/LUX",
    closing: "12 hours",
    yourUSD: "0.00 USD",
    yourLUX: "0.00 LUX",
  },
]

export function LuxDataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-right">Period</TableHead>
          <TableHead className="text-right">LUX Distributed</TableHead>
          <TableHead className="text-right">Total USD</TableHead>
          <TableHead className="text-right">Effective Price</TableHead>
          <TableHead className="text-right">Closing</TableHead>
          <TableHead className="text-right">Your USD</TableHead>
          <TableHead className="text-right">Your LUX</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {luxData.map((lux) => (
          <TableRow key={lux.period}>
            <TableCell className="text-right">{lux.period}</TableCell>
            <TableCell className="text-right">{lux.LUXDistributed}</TableCell>
            <TableCell className="text-right">{lux.totalUSD}</TableCell>
            <TableCell className="text-right">{lux.effectivePrice}</TableCell>
            <TableCell className="text-right">{lux.closing}</TableCell>
            <TableCell className="text-right">{lux.yourUSD}</TableCell>
            <TableCell className="text-right">{lux.yourLUX}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
