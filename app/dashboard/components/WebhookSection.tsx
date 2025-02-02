import { useState, useEffect } from "react";
import { MdWebhook } from "react-icons/md";
import { FaPlus, FaTimes, FaGhost, FaPencilAlt, FaTrash } from "react-icons/fa";
import Alert from "@/components/Alert";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function WebhookSection() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    events: [] as string[],
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  useEffect(() => {
    const fetchWebhooks = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setWebhooks([
        {
          id: '1',
          url: 'https://api.example.com/webhook1',
          events: ['game.created', 'game.updated'],
          status: 'active',
          createdAt: '2024-03-20'
        },
        {
          id: '2',
          url: 'https://api.example.com/webhook2',
          events: ['transaction.completed'],
          status: 'inactive',
          createdAt: '2024-03-19'
        }
      ]);
      setLoading(false);
    };

    fetchWebhooks();
  }, []);

  return (
    <div className="space-y-6 p-2 md:p-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MdWebhook className="text-3xl text-green" />
          <h2 className="text-2xl font-bold text-white">Webhooks</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green/90 group hover:bg-green border-green text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-all"
          >
            <FaPlus className="text-sm text-white" />
            <span className="text-sm">New Webhook</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 bg-slate-800/80 p-6 rounded-lg">
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4">
                <div className="h-4 w-20 skeleton bg-slate-400/10"></div>
                <div className="h-4 w-32 skeleton bg-slate-400/10"></div>
                <div className="h-4 w-24 skeleton bg-slate-400/10"></div>
              </div>
            ))}
          </div>
        ) : webhooks.length > 0 ? (
          <div className="space-y-2">
            {webhooks.map((webhook, index) => (
              <>
                <div
                  key={webhook.id}
                  onClick={() => setSelectedWebhook(webhook)}
                  className="grid grid-cols-3 gap-4 cursor-pointer hover:bg-slate-700/50 p-4 rounded-lg transition-colors"
                >
                  <div>
                    <h3 className="text-gray-300 text-sm">Endpoint URL</h3>
                    <p className="text-white font-medium truncate">{webhook.url}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-300 text-sm">Events</h3>
                    <p className="text-white font-medium">{webhook.events.join(', ')}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-300 text-sm">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {webhook.status}
                    </span>
                  </div>
                </div>
                {index < webhooks.length - 1 && (
                  <hr className="my-2 border-t border-white/20 w-full" />
                )}
              </>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-300 flex flex-col items-center justify-center">
            <FaGhost className="text-[#0CC0DF] text-4xl mb-2" />
            <p>No webhooks configured. Add a new webhook to get started.</p>
          </div>
        )}
      </div>

      {/* Add modals and alert components similar to the game section */}
    </div>
  );
} 