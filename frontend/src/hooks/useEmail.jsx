import { useState, useCallback, useMemo } from "react";
import { useEmailsContext } from "../context/EmailsContext";
import { useUI } from "../context/UIContext";
import { toast } from "sonner";
import { PRIORITY_LEVELS } from "../constants/priorities";

export const useEmail = (draftToEdit = null) => {
  const { saveDraft } = useEmailsContext();
  const { setComposing } = useUI();

  const initialData = useMemo(
    () => ({
      id: null,
      to: "",
      subject: "",
      message: "",
      priority: PRIORITY_LEVELS.MEDIUM,
      attachments: [],
    }),
    []
  );

  const [formData, setFormData] = useState(
    draftToEdit ? { ...draftToEdit } : initialData
  );
  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleInputChange = useCallback(
    async (e) => {
      const { name, value } = e.target;
      const isAddedAttachment =
        !formData.attachments || formData?.attachments?.length < value?.length;
      if (name === "attachments" && isAddedAttachment) {
        toast.warning("Attachments will not be saved in the draft.", {
          duration: 2000,
        });
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setFormData, formData]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setLoading(false);
  }, [initialData]);

  const handleSaveDraft = useCallback(
    (email) => {
      console.log("Saving draft:", email);
      saveDraft(email);
      setComposing(false);
    },
    [saveDraft, setComposing]
  );

  const handleSuccessClose = useCallback(() => {
    setShowSuccessAnimation(false);
    setTimeout(() => {
      setComposing(false);
    }, 1000);
  }, [setComposing]);

  return {
    formData,
    loading,
    showSuccessAnimation,
    handleInputChange,
    resetForm,
    handleSaveDraft,
    handleSuccessClose,
    setLoading,
    setShowSuccessAnimation,
  };
};
