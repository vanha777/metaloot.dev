
import { MdWebhook } from "react-icons/md";

export default function WebhookSection() {
    return (
      <div className="space-y-6 p-2 md:p-8">
        <div className="flex items-center gap-3">
          <MdWebhook className="text-3xl text-green" />
          <h2 className="text-2xl font-bold text-white">Webhooks</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        </div>
      </div>
    )
  } 