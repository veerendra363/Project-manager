import graphene
from .types import ProjectType, TaskType, TaskCommentType, OrganizationType
from api.models import Organization, Project, Task, TaskComment


class CreateOrganization(graphene.Mutation):
    organization = graphene.Field(OrganizationType)

    class Arguments:
        name = graphene.String(required=True)
        slug = graphene.String(required=True)
        contact_email = graphene.String(required=True)

    def mutate(self, info, name, slug, contact_email):
        org = Organization.objects.create(
            name=name,
            slug=slug,
            contact_email=contact_email
        )
        return CreateOrganization(organization=org)


class CreateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        organization_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.types.datetime.Date()

    def mutate(self, info, organization_id, name, description=None, status='PL', due_date=None):
        org = Organization.objects.get(id=organization_id)
        project = Project.objects.create(
            organization=org,
            name=name,
            description=description,
            status=status,
            due_date=due_date
        )
        return CreateProject(project=project)


class CreateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String(required=True)

    def mutate(self, info, project_id, title, assignee_email, description=None, status='TD'):
        project = Project.objects.get(id=project_id)
        task = Task.objects.create(
            project=project,
            title=title,
            assignee_email=assignee_email,
            description=description,
            status=status
        )
        return CreateTask(task=task)


class AddTaskComment(graphene.Mutation):
    comment = graphene.Field(TaskCommentType)

    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)

    def mutate(self, info, task_id, content, author_email):
        task = Task.objects.get(id=task_id)
        comment = TaskComment.objects.create(
            task=task,
            content=content,
            author_email=author_email
        )
        return AddTaskComment(comment=comment)
class UpdateOrganization(graphene.Mutation):
    organization = graphene.Field(OrganizationType)

    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        slug = graphene.String()
        contact_email = graphene.String()

    def mutate(self, info, id, name=None, slug=None, contact_email=None):
        org = Organization.objects.get(id=id)
        if name is not None:
            org.name = name
        if slug is not None:
            org.slug = slug
        if contact_email is not None:
            org.contact_email = contact_email
        org.save()
        return UpdateOrganization(organization=org)
class UpdateProject(graphene.Mutation):
    project = graphene.Field(ProjectType)

    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        status = graphene.String()
        due_date = graphene.types.datetime.Date()

    def mutate(self, info, id, name=None, description=None, status=None, due_date=None):
        project = Project.objects.get(id=id)
        if name is not None:
            project.name = name
        if description is not None:
            project.description = description
        if status is not None:
            project.status = status
        if due_date is not None:
            project.due_date = due_date
        project.save()
        return UpdateProject(project=project)
class UpdateTask(graphene.Mutation):
    task = graphene.Field(TaskType)

    class Arguments:
        id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()

    def mutate(self, info, id, title=None, description=None, status=None, assignee_email=None):
        task = Task.objects.get(id=id)
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if status is not None:
            task.status = status
        if assignee_email is not None:
            task.assignee_email = assignee_email
        task.save()
        return UpdateTask(task=task)

class UpdateTaskComment(graphene.Mutation):
    comment = graphene.Field(TaskCommentType)

    class Arguments:
        id = graphene.ID(required=True)
        content = graphene.String()

    def mutate(self, info, id, content=None):
        comment = TaskComment.objects.get(id=id)
        if content is not None:
            comment.content = content
        comment.save()
        return UpdateTaskComment(comment=comment)



class Mutation(graphene.ObjectType):
    create_organization = CreateOrganization.Field()
    create_project = CreateProject.Field()
    create_task = CreateTask.Field()
    add_task_comment = AddTaskComment.Field()

    update_organization = UpdateOrganization.Field()
    update_project = UpdateProject.Field()
    update_task = UpdateTask.Field()
    update_task_comment = UpdateTaskComment.Field()
