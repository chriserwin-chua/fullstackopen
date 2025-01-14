import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from '@mui/material';

import NewEntryForm from './NewEntryForm';
import { Diagnosis, EntryFormValues, EntryType } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: EntryType;
  diagnosis: Diagnosis[];
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  entryType,
  diagnosis,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}

      <NewEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        entryType={entryType}
        diagnosis={diagnosis}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
