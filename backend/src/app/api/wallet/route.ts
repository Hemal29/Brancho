import { requireRole } from "@/lib/auth";
import { query, getRow } from "@/lib/db";
import { ok, fail, errorMessage } from "@/lib/api";

export async function GET() {
  try {
    const user = await requireRole(["customer"])();
    const wallet = await getRow<{ balance: string }>("SELECT balance FROM Wallets WHERE userId = ?", [user.id]);
    const transactions = await query(
      "SELECT * FROM WalletTransactions WHERE userId = ? ORDER BY createdAt DESC LIMIT 50",
      [user.id]
    );
    return ok({ balance: wallet ? parseFloat(wallet.balance) : 0, transactions });
  } catch (err) {
    if (errorMessage(err) === "UNAUTHORIZED") return fail("Please login to continue.", 401);
    return fail(errorMessage(err), 500);
  }
}
