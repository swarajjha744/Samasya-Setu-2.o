import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Problem } from '../../types';
import { X, Star, CheckCircle2 } from 'lucide-react';

interface FeedbackModalProps {
  problem: Problem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  problem,
  isOpen,
  onClose
}) => {
  const { t, addCitizenFeedback } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('The water filter was installed last Tuesday. Water is completely clear and skin irritation has stopped.');
  const [citizenName, setCitizenName] = useState('Manoj Paswan');

  if (!isOpen || !problem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addCitizenFeedback(problem.id, {
      citizenName: citizenName || 'Anonymous Citizen',
      rating,
      comment,
      createdAt: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#e5e2db] rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#f0ece2] pb-3">
          <h3 className="text-base font-bold font-serif text-[#181512]">
            {t('feedbackModal.title', 'Rate Deployed Solution Impact')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#787267] hover:text-[#181512] hover:bg-[#faf8f5]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded bg-[#faf8f5] border border-[#e5e2db] space-y-1">
          <div className="text-[10px] font-mono uppercase font-bold text-[#c25e2e]">
            {problem.id} • {problem.district}
          </div>
          <div className="text-xs font-bold text-[#181512] font-serif">
            {problem.title}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-mono uppercase text-[#787267] mb-2">
              {t('feedbackModal.ratingLabel', 'Citizen Satisfaction Star Rating')}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-[#d5d0c3]'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-mono font-bold text-[#181512] text-sm">
                {rating} / 5 {t('feedbackModal.stars', 'Stars')}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-mono uppercase text-[#787267] mb-1">
              {t('feedbackModal.nameLabel', 'Your Name / Resident Panchayat')}
            </label>
            <input
              type="text"
              value={citizenName}
              onChange={e => setCitizenName(e.target.value)}
              className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2 text-[#181512] focus:outline-none focus:border-[#c25e2e]"
            />
          </div>

          <div>
            <label className="block font-mono uppercase text-[#787267] mb-1">
              {t('feedbackModal.outcomeLabel', 'Ground Outcome & Life Improvement Details')}
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full bg-[#faf8f5] border border-[#d5d0c3] rounded p-2 text-[#181512] focus:outline-none focus:border-[#c25e2e]"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0ece2]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded bg-[#faf8f5] border border-[#d5d0c3] font-mono text-[#575147] cursor-pointer"
            >
              {t('common.cancel', 'CANCEL')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#c25e2e] text-white font-mono font-bold uppercase tracking-wider hover:bg-[#a94f24] cursor-pointer"
            >
              {t('feedbackModal.submitBtn', 'SUBMIT VERIFICATION')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
