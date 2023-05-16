using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using webapi.Model;

namespace webapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentController : Controller
{

    private readonly ILogger<StudentController> _logger;

    public StudentController(ILogger<StudentController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetStudents")]
    public IActionResult Get()
    {
        return new JsonResult(new List<Student>() {
            new Student
            {
                name = "Alice",
                age = 20,
                hobies = new List<string>() { "reading", "swimming", "coding" }
            },
            new Student
            {
                name = "Bob",
                age = 22,
                hobies = new List<string>() { "painting", "dancing", "singing" }
            }
        });
    }
}
