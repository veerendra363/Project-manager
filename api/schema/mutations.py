import graphene
from .types import ProjectType, TaskType, TaskCommentType
from api.models import Organization, Project, Task, TaskComment

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
            organization=org, name=name, description=description, status=status, due_date=due_date
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
            project=project, title=title, assignee_email=assignee_email, description=description, status=status
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
        comment = TaskComment.objects.create(task=task, content=content, author_email=author_email)
        return AddTaskComment(comment=comment)

class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    create_task = CreateTask.Field()
    add_task_comment = AddTaskComment.Field()
