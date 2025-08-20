from django.core.management.base import BaseCommand
from api.models import Organization, Project, Task, TaskComment
from django.utils import timezone
import random

class Command(BaseCommand):
    help = "Seed demo data for organizations, projects, tasks, and comments"

    def handle(self, *args, **kwargs):
        # 1. Clear old data (reverse order for safety)
        TaskComment.objects.all().delete()
        Task.objects.all().delete()
        Project.objects.all().delete()
        Organization.objects.all().delete()

        # 2. Create 11 organizations
        orgs = []
        for i in range(1, 12):
            org = Organization.objects.create(
                name=f"Organization {i}",
                slug=f"org-{i}",
                contact_email=f"org{i}@example.com",
                created_at=timezone.now()
            )
            orgs.append(org)

        # 3. Add projects for each org
        status_choices = ["PL", "IP", "CO", "ON"]
        for i, org in enumerate(orgs, start=1):
            num_projects = 6 if i == 11 else random.randint(2, 4)

            for j in range(1, num_projects + 1):
                project = Project.objects.create(
                    organization=org,
                    name=f"Project {j} of {org.name}",
                    status=random.choice(status_choices),
                    description=f"Description for project {j} of {org.name}",
                    due_date=timezone.now().date(),
                    created_at=timezone.now()
                )

                # Special rule: last org (11th) → 6th project → 10 tasks
                if i == 11 and j == 6:
                    for t in range(1, 11):
                        task = Task.objects.create(
                            project=project,
                            title=f"Task {t} of Project {j} ({org.name})",
                            description="Sample task description",
                            status=random.choice(["TD", "IP", "DN"]),
                            assignee_email=f"user{t}@example.com",
                            created_at=timezone.now()
                        )
                        # Each task → 11 comments
                        for c in range(1, 12):
                            TaskComment.objects.create(
                                task=task,
                                content=f"Comment {c} on Task {t}",
                                author_email=f"commenter{c}@example.com",
                                timestamp=timezone.now(),
                                created_at=timezone.now()
                            )
                else:
                    # Other projects → add random tasks
                    for t in range(random.randint(1, 3)):
                        task = Task.objects.create(
                            project=project,
                            title=f"Task {t+1} of Project {j} ({org.name})",
                            description="Sample task description",
                            status=random.choice(["TD", "IP", "DN"]),
                            assignee_email=f"user{t+1}@example.com",
                            created_at=timezone.now()
                        )

        self.stdout.write(self.style.SUCCESS("✅ Seed data created successfully!"))
