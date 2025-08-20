import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { CREATE_ORGANIZATION, UPDATE_ORGANIZATION } from "../../graphql/organization/mutations";

interface OrganizationFormProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
  organization?: {
    id: string;
    name?: string;
    slug?: string;
    contactEmail?: string;
  } | null;
}

export default function OrganizationForm({
  onSuccess,
  onError,
  organization,
}: OrganizationFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Populate fields if editing
  useEffect(() => {
    if (organization) {
      setName(organization.name || "");
      setSlug(organization.slug || "");
      setContactEmail(organization.contactEmail || "");
    }
  }, [organization]);

  const [createOrganization, { loading: creating }] = useMutation(CREATE_ORGANIZATION, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const [updateOrganization, { loading: updating }] = useMutation(UPDATE_ORGANIZATION, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (organization?.id) {
      // Update
      updateOrganization({
        variables: {
          id: organization.id,
          name,
          slug,
          contactEmail,
        },
      });
    } else {
      // Create
      createOrganization({
        variables: {
          name,
          slug,
          contactEmail,
        },
      });
    }
  };

  if (creating || updating) return <Loading />;

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col gap-2 w-full max-w-md bg-cyan-100 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-medium text-black mt-2 text-left">Organization Name</label>
        <input
          type="text"
          placeholder="Enter organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        <label className="text-sm font-medium text-black mt-2 text-left">Slug</label>
        <input
          type="text"
          placeholder="Enter slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        <label className="text-sm font-medium text-black mt-2 text-left">Contact Email</label>
        <input
          type="email"
          placeholder="Enter contact email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          {organization?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
